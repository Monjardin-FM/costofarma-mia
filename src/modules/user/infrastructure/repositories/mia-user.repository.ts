import { User } from "../../domain/entities/user";
import { api } from "../../../../utils/api";
import {
  UserRepository,
  UserRepositorySignInDTO,
} from "../../domain/repositories/user.repository";
import { UserRole } from "../../domain/entities/user-role";

export class MiaUserRepository implements UserRepository {
  async signIn({ email, password }: UserRepositorySignInDTO): Promise<User> {
    try {
      const response = await api().post("Security/Login", {
        // searchParams: {
        //   applicationId: 1,
        // },
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

      const APPLICATION_DATA = {
        id: 1,
        name: "MIA",
      };

      const application = this.findApplication({
        applications: userData.aplicacion,
        id: APPLICATION_DATA.id,
        name: APPLICATION_DATA.name,
      });

      const user: User = {
        id: userData.idPersona,
        firstname: userData.nombre,
        lastname: `${userData.apellidoPaterno} ${userData.apellidoMaterno}`,
        gender: userData.idGenero === 0 ? "male" : "female",
        roles: application
          ? this.parseUserRoles({ roles: application.role })
          : [],
        metadata: {
          jwt: data.data.token,
        },
      };

      return user;
    } catch (error) {
      throw new Error();
    }
  }

  private findApplication(params: {
    id: number;
    name: string;
    applications: any[];
  }): any {
    const query = (item: any) =>
      item.idAplicacion === params.id && item.descripcion === params.name;

    const application = params.applications.find(query);
    return application;
  }

  private parseUserRoles(params: { roles: any[] }): UserRole[] {
    const ACTIVE_STATUS = 2;
    const roles = params.roles.reduce<UserRole[]>((previous, current) => {
      if (current.idStatus !== ACTIVE_STATUS) return previous;
      else if (current.descripcion === "admin") return [...previous, "admin"];
      else if (current.descripcion === "finances")
        return [...previous, "finances"];
      else if (current.descripcion === "operations")
        return [...previous, "operator"];
      else if (current.descripcion === "customers")
        return [...previous, "customer"];
      else if (current.descripcion === "admin_regulatory")
        return [...previous, "admin_regulatory"];
      else if (current.descripcion === "shopper")
        return [...previous, "shopper"];
      else if (current.descripcion === "regulatory")
        return [...previous, "regulatory_manager"];
      else if (current.descripcion === "regulatory_manager_distributor")
        return [...previous, "regulatory_manager_distributor"];
      else if (current.descripcion === "storage")
        return [...previous, "storage"];
      else if (current.descripcion === "delivery_man")
        return [...previous, "delivery_man"];
      else if (current.descripcion === "portfolio_manager")
        return [...previous, "portfolio_manager"];
      else if (current.descripcion === "admin_order")
        return [...previous, "admin_order"];
      else if (current.descripcion === "admin_finances")
        return [...previous, "admin_finances"];
      else if (current.descripcion === "Farmaleal")
        return [...previous, "internal"];
      else if (current.descripcion === "permission_manager")
        return [...previous, "permission_manager"];
      else if (current.descripcion === "pharmacy_sells")
        return [...previous, "pharmacy_sells"];
      else if (current.descripcion === "regulatory_download_reports")
        return [...previous, "regulatory_download_reports"];
      else if (current.descripcion === "cotizador")
        return [...previous, "cotizador"];
      else if (current.descripcion === "government_reader")
        return [...previous, "government_reader"];
      else if (current.descripcion === "government_editor")
        return [...previous, "government_editor"];
      else if (current.descripcion === "admin_products")
        return [...previous, "admin_products"];
      else if (current.descripcion === "admin_purchase")
        return [...previous, "admin_purchase"];
      else if (current.descripcion === "admin_finance")
        return [...previous, "admin_finance"];
      else if (current.descripcion === "gestor_inventory")
        return [...previous, "gestor_inventory"];
      else if (current.descripcion === "admin_store")
        return [...previous, "admin_store"];
      else if (current.descripcion === "licitacion_gestor")
        return [...previous, "licitacion_gestor"];
      else if (current.descripcion === "order_gestor")
        return [...previous, "order_gestor"];
      else if (current.descripcion === "high_supply_gestor")
        return [...previous, "high_supply_gestor"];
      else if (current.descripcion === "admin_master_order")
        return [...previous, "admin_master_order"];
      else if (current.descripcion === "admin_supply_master_order")
        return [...previous, "admin_supply_master_order"];
      else if (current.descripcion === "admin_manufacture_master_order")
        return [...previous, "admin_manufacture_master_order"];
      else if (current.descripcion === "admin_process_master_order")
        return [...previous, "admin_process_master_order"];

      return previous;
    }, []);

    return roles;
  }
}
