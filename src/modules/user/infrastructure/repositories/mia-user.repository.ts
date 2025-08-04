import { User } from "../../domain/entities/user";
import { api } from "../../../../utils/api";
import {
  UserRepository,
  UserRepositorySignInDTO,
} from "../../domain/repositories/user.repository";
// import { UserRole } from "../../domain/entities/user-role";
// import { UserRole } from 'modules/user/domain/entities/user-role';

export class MiaUserRepository implements UserRepository {
  async signIn({ email, password }: UserRepositorySignInDTO): Promise<User> {
    try {
      const response = await api().post("Security/Login", {
        searchParams: {
          applicationId: 1,
        },
        json: {
          user: email,
          password,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      const isSuccess = data?.isSuccess && data?.statusCode === 200;

      if (!isSuccess) {
        throw new Error();
      }

      const userData = data.data.userinfo;

      // const APPLICATION_DATA = {
      //   id: 1,
      //   name: 'MIA',
      // };

      // const application = this.findApplication({
      //   applications: userData.aplicacion,
      //   id: APPLICATION_DATA.id,
      //   name: APPLICATION_DATA.name,
      // });

      const user: User = {
        idPerson: userData.idPersona,
        eMail: userData.eMail,
        name: userData.name,
        // firstname: userData.nombre,
        // lastname: `${userData.apellidoPaterno} ${userData.apellidoMaterno}`,
        // gender: userData.idGenero === 0 ? 'male' : 'female',
        roles: userData.roles,
        // roles: application
        //   ? this.parseUserRoles({ roles: application.role })
        //   : [],
        metadata: {
          jwt: data.data.token,
        },
      };

      return user;
    } catch (error) {
      throw new Error();
    }
  }

  // private findApplication(params: {
  //   id: number;
  //   name: string;
  //   applications: any[];
  // }): any {
  //   const query = (item: any) =>
  //     item.idAplicacion === params.id && item.descripcion === params.name;

  //   const application = params.applications.find(query);
  //   return application;
  // }

  // private parseUserRoles(params: { roles: any[] }): UserRole[] {
  //   const ACTIVE_STATUS = 2;
  //   const roles = params.roles.reduce<UserRole[]>((previous, current) => {
  //     if (current.idStatus !== ACTIVE_STATUS) return previous;
  //     else if (current.descripcion === 'admin') return [...previous, 'admin'];

  //     return previous;
  //   }, []);

  //   return roles;
  // }
}
