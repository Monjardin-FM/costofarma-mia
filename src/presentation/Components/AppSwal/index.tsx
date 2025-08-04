import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const AppSwal = () =>
  withReactContent(
    Swal.mixin({
      confirmButtonColor: '#65af9d',
    }),
  );
