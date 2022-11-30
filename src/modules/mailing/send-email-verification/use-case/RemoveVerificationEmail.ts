import { UniqId } from "@/src/utils/UniqId";
import { IVerificationEmailRepo } from "../domain/interfaces/IVerificationEmailRepo";

export class RemoveVerificationEmail{
    constructor(private verificationEmailRepo: IVerificationEmailRepo){}

    async removeById(id: UniqId):Promise<void>{
        await this.verificationEmailRepo.removeById(id);
    }
}