import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationTokenId } from "../domain/VerificationTokenId";

export class RemoveVerificationEmail{
    constructor(private verificationEmailRepo: IVerificationEmailRepo){}

    async remove(tokenId: VerificationTokenId):Promise<void>{
        await this.verificationEmailRepo.remove(tokenId.id);
    }
}