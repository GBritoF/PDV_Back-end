export type TUserProps = {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  emailVerified?: Boolean;
  confirmationToken?: String;
  createdAt?: Date;
};

export type TUserUpdatedPassProps = {
  senha: string;
};
