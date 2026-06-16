export interface IProfileProps {
  id: string; // references auth.users.id
  name: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Profile {
  public readonly id: string;
  public name: string;
  public phone: string;
  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: IProfileProps) {
    if (!props.id) {
      throw new Error('Profile id is required');
    }
    if (!props.name || props.name.trim() === '') {
      throw new Error('Profile name is required');
    }
    if (!props.phone || props.phone.trim() === '') {
      throw new Error('Profile phone is required');
    }

    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
