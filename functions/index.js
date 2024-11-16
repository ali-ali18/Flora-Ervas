const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializa o Firebase Admin SDK
admin.initializeApp();

// Função para cadastrar um novo colaborador
exports.cadastrarColaborador = functions.https.onRequest(async (req, res) => {
	const { email, senha, nome, cargo } = req.body;

	try {
		// Cria o usuário no Firebase Authentication
		const user = await admin.auth().createUser({
			email: email,
			password: senha,
		});

		// Adiciona os dados adicionais no Firestore na coleção 'colaboradores'
		await admin.firestore().collection('colaboradores').doc(user.uid).set({
			nome: nome,
			email: email,
			cargo: cargo,
			createdAt: new Date(),
		});

		res.status(200).send({ message: 'Usuário criado com sucesso' });
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Erro ao criar usuário', error: error.message });
	}
});
