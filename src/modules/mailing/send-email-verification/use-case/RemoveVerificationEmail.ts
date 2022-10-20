import { UniqId } from "@/src/utils/UniqId";
import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";

export class RemoveVerificationEmail{
    constructor(private verificationEmailRepo: IVerificationEmailRepo){}

    async remove(tokenId: UniqId):Promise<void>{
        await this.verificationEmailRepo.remove(tokenId.id);
    }
}