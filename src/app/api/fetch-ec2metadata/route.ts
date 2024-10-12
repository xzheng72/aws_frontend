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
    timeout(3000);

    if (response_AZ.ok && response_InstanceId.ok) {
      const availabilityZone = await response_AZ.text();
      const instanceId = await response_InstanceId.text();

      if (availabilityZone && instanceId) {
        return NextResponse.json({ availabilityZone, instanceId });
      } else {
        return NextResponse.json({
          availabilityZone: 'Empty data',
          instanceId: 'Empty data',
        });
      }
    } else {
      return NextResponse.json(
        { error: 'The response from http://169.254.169.254 is not ok' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(
      'Error sending GET Request to :http://169.254.169.254',
      error
    );
    return NextResponse.json(
      { error: 'Error sending GET Request to :http://169.254.169.254' },
      { status: 500 }
    );
  }
}
