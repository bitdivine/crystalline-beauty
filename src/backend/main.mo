import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type ServiceType = {
    #cleaning;
    #consumableReplacement;
    #repair;
    #other : Text;
  };

  public type Order = {
    owner : Principal;
    serviceType : ServiceType;
    details : Text;
    timestamp : Time.Time;
    id : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  module OrderModule {
    public func compare(order1 : Order, order2 : Order) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  var nextOrderId = 0;

  // Data storage: Map from orderId to Order
  let orders = Map.empty<Nat, Order>();

  // User profiles storage
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Order management functions
  public shared ({ caller }) func createOrder(serviceType : ServiceType, details : Text) : async Nat {
    // Authorization: Only authenticated users can create orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create orders");
    };

    // Validate input
    if (details.size() > 1000) {
      Runtime.trap("Order details must not exceed 1000 characters");
    };

    // Create new order
    let order : Order = {
      owner = caller;
      serviceType;
      details;
      timestamp = Time.now();
      id = nextOrderId;
    };

    // Store order and increment id counter
    orders.add(nextOrderId, order);
    nextOrderId += 1;

    order.id;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    // Authorization: Only authenticated users can view their orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view orders");
    };

    let callerOrders = orders.values().filter(
      func(order : Order) : Bool {
        order.owner == caller;
      }
    ).toArray();

    callerOrders.sort();
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async ?Order {
    // Authorization: Only authenticated users can view orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view orders");
    };

    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) {
        // Ownership check: Users can only view their own orders (unless admin)
        if (order.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: You can only access your own orders");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func getAvailableServiceTypes() : async [ServiceType] {
    // This is a utility function that can be accessed by anyone (including guests)
    // No authorization check needed as it doesn't expose sensitive data
    [
      #cleaning,
      #consumableReplacement,
      #repair,
    ];
  };

  // Admin-only function to get all orders
  public query ({ caller }) func getAllOrders() : async [Order] {
    // Authorization: Only admins can view all orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };

    let allOrders = orders.values().toArray();
    allOrders.sort();
  };
};
