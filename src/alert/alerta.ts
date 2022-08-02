import Swal from 'sweetalert2';

export const alerta = (_alerta: { title?: string; message: string }) => {
	Swal.fire({
		title: _alerta.title,
		text: _alerta.message,
		icon: 'warning'
	});
};
