import { NFTStorage } from 'nft.storage';

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU3YmE4ZGRBZDM4RDc2NGQ2RDBlZDNlQzZhQTJhRDlGMDk2ZTY0NzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDMwMDg0OTMyMiwibmFtZSI6ImF1dG9jbGlja2VyIn0.nPI0uUtcT3mpKV16XFPc79CYCitMyRpfKX1ZGhqisnk"

export const upload = async (image: any): Promise<{ url: string; ipfs: string}> => {
    const storage = new NFTStorage({ token: api_key || "" });
    const blob = new Blob([image]);
    const cid = await storage.storeBlob(blob);
    return {
        url: `ipfs://${cid}`,
        ipfs: cid
    }
};