import { useGetMyOrders } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ClipboardList, Calendar, Wrench, Sparkles, Package, AlertCircle } from 'lucide-react';
import type { Order, ServiceType } from '../backend';

export default function OrdersList() {
  const { data: orders, isLoading, error } = useGetMyOrders();

  const formatServiceType = (serviceType: ServiceType): string => {
    if (serviceType.__kind__ === 'cleaning') return 'Cleaning';
    if (serviceType.__kind__ === 'consumableReplacement') return 'Consumable Replacement';
    if (serviceType.__kind__ === 'repair') return 'Repair';
    if (serviceType.__kind__ === 'other') return serviceType.other;
    return 'Unknown';
  };

  const getServiceIcon = (serviceType: ServiceType) => {
    if (serviceType.__kind__ === 'cleaning') return <Sparkles className="h-5 w-5" />;
    if (serviceType.__kind__ === 'consumableReplacement') return <Package className="h-5 w-5" />;
    if (serviceType.__kind__ === 'repair') return <Wrench className="h-5 w-5" />;
    return <AlertCircle className="h-5 w-5" />;
  };

  const getServiceColor = (serviceType: ServiceType): string => {
    if (serviceType.__kind__ === 'cleaning') return 'bg-accent text-accent-foreground';
    if (serviceType.__kind__ === 'consumableReplacement') return 'bg-secondary text-secondary-foreground';
    if (serviceType.__kind__ === 'repair') return 'bg-muted text-muted-foreground';
    return 'bg-primary/20 text-primary';
  };

  const formatDate = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <AlertCircle className="mx-auto mb-2 h-8 w-8" />
            <p>Failed to load orders. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="py-12">
          <div className="text-center">
            <ClipboardList className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No orders yet</h3>
            <p className="text-muted-foreground">Create your first service order to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: Order) => (
        <Card key={order.id.toString()} className="shadow-md transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getServiceColor(order.serviceType)}`}>
                  {getServiceIcon(order.serviceType)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Order #{order.id.toString()}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {formatDate(order.timestamp)}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {formatServiceType(order.serviceType)}
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{order.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
