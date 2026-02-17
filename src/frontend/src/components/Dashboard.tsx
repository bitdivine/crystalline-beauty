import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, Plus } from 'lucide-react';
import CreateOrderForm from './CreateOrderForm';
import OrdersList from './OrdersList';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Service Orders</h2>
        <p className="text-muted-foreground">Create and manage your service requests</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="orders" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            My Orders
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <OrdersList />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <CreateOrderForm onSuccess={() => setActiveTab('orders')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
