import { GameClient, LocationClient } from 'pokenode-ts'

import PokemonMapPageClient from '@/map/[region]/pageClient'
import Location from '@/components/map/Location'

export default async function PokemonMapPage({
  params
}: {
  params: Promise<{ region: string }>
}) {
  const { region: regionName } = await params
  const locationClient = new LocationClient()
  const gameClient = new GameClient()

  const region = await locationClient.getRegionByName(regionName)
  const versions = []
  for (const vg of region.version_groups) {
    const versionGroup = await gameClient.getVersionGroupByName(vg.name)
    versions.push(...versionGroup.versions.map(ver => ver.name))
  }

  return (
    <PokemonMapPageClient
      region={region}
      versionsList={versions}
    >
      {region.locations.map((loc, idx) => (
        <Location
          key={idx}
          locationName={loc.name}
        />
      ))}
    </PokemonMapPageClient>
  )
}
