import { Address } from './address.model';

export class Profile {
  public firstName?: string;
  public lastName?: string;
  public nickName?: string;
  public picture?: string;
  public country?: string;
  public currency?: string;
  public email?: string;
  public address?: Address[];
  public phone?: string;
  public mobile?: string;
  public promoCode: string;
  public percent: number;
  constructor() {}
}
