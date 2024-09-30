import { ClientAppChain } from "@proto-kit/sdk";
import runtime from "../runtime";
import { ZkNoidSigner } from "../signer";



const appChain = ClientAppChain.fromRuntime(runtime.modules, ZkNoidSigner);

appChain.configurePartial({
  Runtime: runtime.config,
});

appChain.configurePartial({
  GraphqlClient: {
    url: process.env.NEXT_PUBLIC_PROTOKIT_GRAPHQL_URL,
  },
});

export const client = appChain;