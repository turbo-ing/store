import { AppChainModule, Signer } from '@proto-kit/sdk';
import { Field, Signature } from 'o1js';
import { injectable } from 'tsyringe';

export async function requestAccounts() {
  if ((window as any).mina?.isPallad) {
    return await (window as any).mina
      ?.request({ method: 'mina_accounts' })
      .then((resp: any) => resp.result);
  } else {
    return await (window as any).mina?.requestAccounts();
  }
}

@injectable()
export class ZkNoidSigner extends AppChainModule<unknown> implements Signer {
  public async sign(message: Field[]): Promise<Signature> {
    try {
      const response = await (window as any).mina.signFields({
        message: message.map((field) => field.toString()),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return Signature.fromBase58(response.signature);
    } catch (e: any) {
      if (e?.code == 1001) {
        await requestAccounts();
        return await this.sign(message);
      } else {
        throw e;
      }
    }
  }
}
