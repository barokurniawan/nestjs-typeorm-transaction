import * as bcrypt from 'bcrypt';

class UsmCrypto {

    static readonly saltOrRounds = 10;

    public static encrypt(password: string) {
        return bcrypt.hash(password, UsmCrypto.saltOrRounds);
    }

    public static compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}

export default UsmCrypto;