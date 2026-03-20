import { LocationClient as PokeLocationClient } from 'pokenode-ts'

import LocationClient from './LocationClient'
import LocationArea from './LocationArea'

export default async function Location({
  locationName
}: {
  locationName: string
}) {
  const client = new PokeLocationClient()
  const location = await client.getLocationByName(locationName)

  return (
    <LocationClient
      location={location}
    >
      <div className='flex flex-col'>
        {location.areas.map((area, idx) => (
          area.name ?
            <LocationArea
              key={idx}
              locationAreaName={area.name}
            /> : `area.name=${area.name}`
        ))}
      </div>
    </LocationClient>
  )
}
