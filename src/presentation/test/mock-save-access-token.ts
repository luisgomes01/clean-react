import { SaveAccessToken } from '@/domain/usecases/save-acces-token'

export class SaveAccessTokenMock implements SaveAccessToken {
    accessToken: string

    async save (accessToken: string): Promise<void> {
      this.accessToken = accessToken
    }
}
