import { useState } from 'react';
import { useCreateOrder } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { ServiceType } from '../backend';

interface CreateOrderFormProps {
  onSuccess?: () => void;
}

export default function CreateOrderForm({ onSuccess }: CreateOrderFormProps) {
  const [serviceType, setServiceType] = useState<string>('');
  const [otherServiceType, setOtherServiceType] = useState('');
  const [details, setDetails] = useState('');
  const createOrder = useCreateOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }

    if (serviceType === 'other' && !otherServiceType.trim()) {
      toast.error('Please specify the service type');
      return;
    }

    if (!details.trim()) {
      toast.error('Please provide service details');
      return;
    }

    if (details.length > 1000) {
      toast.error('Details must not exceed 1000 characters');
      return;
    }

    let serviceTypeValue: ServiceType;
    if (serviceType === 'cleaning') {
      serviceTypeValue = { __kind__: 'cleaning', cleaning: null };
    } else if (serviceType === 'consumableReplacement') {
      serviceTypeValue = { __kind__: 'consumableReplacement', consumableReplacement: null };
    } else if (serviceType === 'repair') {
      serviceTypeValue = { __kind__: 'repair', repair: null };
    } else {
      serviceTypeValue = { __kind__: 'other', other: otherServiceType.trim() };
    }

    try {
      await createOrder.mutateAsync({
        serviceType: serviceTypeValue,
        details: details.trim(),
      });
      toast.success('Order created successfully!');
      setServiceType('');
      setOtherServiceType('');
      setDetails('');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
      console.error('Order creation error:', error);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Create New Service Order</CardTitle>
        <CardDescription>Fill in the details below to request a service</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType} disabled={createOrder.isPending}>
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="consumableReplacement">Consumable Replacement</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {serviceType === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="otherServiceType">Specify Service Type</Label>
              <Input
                id="otherServiceType"
                type="text"
                placeholder="e.g., Maintenance, Installation, etc."
                value={otherServiceType}
                onChange={(e) => setOtherServiceType(e.target.value)}
                disabled={createOrder.isPending}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="details">Service Details</Label>
            <Textarea
              id="details"
              placeholder="Describe what you need in detail..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={createOrder.isPending}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">{details.length}/1000 characters</p>
          </div>

          <Button type="submit" className="w-full" disabled={createOrder.isPending}>
            {createOrder.isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                Creating Order...
              </>
            ) : (
              'Create Order'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
