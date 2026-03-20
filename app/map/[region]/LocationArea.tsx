import { LocationClient } from 'pokenode-ts'
import LocationAreaClient from './LocationAreaClient'

const client = new LocationClient()

export default async function LocationArea({
  locationAreaName
}: {
  locationAreaName: string
}) {
  try {
    const locationArea = await client.getLocationAreaByName(locationAreaName)
    return (
      <LocationAreaClient
        locationArea={locationArea}
      />
    )
  } catch (err) {
    return <span>Error</span>
  }
}
