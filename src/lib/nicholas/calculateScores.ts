import type { MethodInput, ScoredMethod } from '@/types';
import {
  ELIMINATED,
  MINING_METHODS,
  T3_GEOMETRY,
  T4A_ORE,
  T4B_HANGING_WALL,
  T4C_FOOTWALL,
} from './scoringMatrices';

export function calculateScores(input: MethodInput): ScoredMethod[] {
  return MINING_METHODS.map((method) => {
    const geo = T3_GEOMETRY[method];
    const geometryScore =
      geo.shape[input.shape] +
      geo.thickness[input.thickness] +
      geo.plunge[input.plunge] +
      geo.grade[input.grade];

    const ore = T4A_ORE[method];
    const oreScore =
      ore.sub[input.oreSubStr] +
      ore.spac[input.oreFracSpac] +
      ore.str[input.oreFracStr];

    const hwData = T4B_HANGING_WALL[method];
    const hwScore =
      hwData.sub[input.hwSubStr] +
      hwData.spac[input.hwFracSpac] +
      hwData.str[input.hwFracStr];

    const fwData = T4C_FOOTWALL[method];
    const fwScore =
      fwData.sub[input.fwSubStr] +
      fwData.spac[input.fwFracSpac] +
      fwData.str[input.fwFracStr];

    const rockTotal = oreScore + hwScore + fwScore;
    const total = geometryScore + rockTotal;

    const allScores = [
      geo.shape[input.shape],
      geo.thickness[input.thickness],
      geo.plunge[input.plunge],
      geo.grade[input.grade],
      ore.sub[input.oreSubStr],
      ore.spac[input.oreFracSpac],
      ore.str[input.oreFracStr],
      hwData.sub[input.hwSubStr],
      hwData.spac[input.hwFracSpac],
      hwData.str[input.hwFracStr],
      fwData.sub[input.fwSubStr],
      fwData.spac[input.fwFracSpac],
      fwData.str[input.fwFracStr],
    ];

    return {
      method,
      geometryScore,
      oreScore,
      hwScore,
      fwScore,
      rockTotal,
      total,
      isEliminated: allScores.some((v) => v <= ELIMINATED),
    };
  }).sort((a, b) => b.total - a.total);
}
