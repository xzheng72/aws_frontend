import { timeout } from '@/api/apiUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response_AZ = await fetch(
      'http://169.254.169.254/latest/meta-data/placement/availability-zone',
      {
        cache: 'no-store',
      }
    );
    const response_InstanceId = await fetch(
      'http://169.254.169.254/latest/meta-data/instance-id',
      {
        cache: 'no-store',
      }
    );
    timeout(500);

    if (response_AZ.ok && response_InstanceId.ok) {
      const availabilityZone = await response_AZ.text();
      const instanceId = await response_InstanceId.text();

      return NextResponse.json({ availabilityZone, instanceId });
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch availability zone' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching EC2 metadata:', error);
    return NextResponse.json(
      { error: 'Error fetching EC2 metadata' },
      { status: 500 }
    );
  }
}
