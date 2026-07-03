import type { RegisterPayload } from '../types/register'

export interface RegisterService {
  register(payload: RegisterPayload): Promise<void>
}

// TODO: Implementar um adaptador para este contrato quando o endpoint oficial estiver disponível.
// TODO: Manter os detalhes da comunicação HTTP fora desta interface pública.
