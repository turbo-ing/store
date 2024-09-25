import {
  PublicKey,
  UInt64,
  Struct,
  Provable,
  Int64,
  Bool,
  CircuitString,
  Field,
} from 'o1js';
// import {
//   BRICK_HALF_WIDTH,
//   CHUNK_LENGTH,
//   GAME_LENGTH,
//   MAX_BRICKS,
//   PRECISION,
// } from '../constants';
// import { inRange } from './utility';
import { UInt64 as ProtoUInt64 } from '@proto-kit/library';

export class GameRecordKey extends Struct({
  competitionId: UInt64,
  player: PublicKey,
}) {}

export class Competition extends Struct({
  name: CircuitString,
  // description: CircuitString,
  seed: Field,
  prereg: Bool,
  preregStartTime: ProtoUInt64,
  preregEndTime: ProtoUInt64,
  competitionStartTime: ProtoUInt64,
  competitionEndTime: ProtoUInt64,
  funds: ProtoUInt64,
  participationFee: ProtoUInt64,
}) {
  static from(
    name: string,
    // description: string,
    seed: string,
    prereg: boolean,
    preregStartTime: number,
    preregEndTime: number,
    competitionStartTime: number,
    competitionEndTime: number,
    funds: number,
    participationFee: number,
  ): Competition {
    return new Competition({
      name: CircuitString.fromString(name),
      // description: CircuitString.fromString(description),
      seed: CircuitString.fromString(seed).hash(),
      prereg: new Bool(prereg),
      preregStartTime: ProtoUInt64.from(preregStartTime),
      preregEndTime: ProtoUInt64.from(preregEndTime),
      competitionStartTime: ProtoUInt64.from(competitionStartTime),
      competitionEndTime: ProtoUInt64.from(competitionEndTime),
      funds: ProtoUInt64.from(funds).mul(10 ** 9),
      participationFee: ProtoUInt64.from(participationFee).mul(10 ** 9),
    });
  }
}

export class LeaderboardIndex extends Struct({
  competitionId: UInt64,
  index: UInt64,
}) {}

export class LeaderboardScore extends Struct({
  score: UInt64,
  player: PublicKey,
}) {}
