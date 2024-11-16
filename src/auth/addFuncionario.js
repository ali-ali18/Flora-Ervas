import { auth, db } from '../fireBaseConfig';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AddFuncionario = async (
	nome,
	email,
	senha,
	cargo,
	onSuccess,
	onFailure,
) => {
	try {
		// Salva as credenciais do admin/dev antes de criar o novo usuário
		const adminEmail = auth.currentUser.email;
		const adminPassword = prompt('Confirme sua senha para manter a sessão');

		// Cria o novo colaborador
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			senha,
		);
		const user = userCredential.user;

		// Adiciona o colaborador ao Firestore
		await setDoc(doc(db, 'colaboradores', user.uid), {
			nome,
			email,
			cargo,
			createdAt: new Date(),
		});

		toast.success('Colaborador cadastrado com sucesso');

		// Reautentica o admin/dev para restaurar a sessão original
		await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

		// Chama a função de sucesso
		if (onSuccess) onSuccess();
	} catch (error) {
		toast.error(
			`Ocorreu um erro ao adicionar o colaborador. Tente novamente ou entre em contato com o suporte. ${error}`,
		);
		// Chama a função de erro, se fornecida
		if (onFailure) onFailure(error);
	}
};

export default AddFuncionario;
