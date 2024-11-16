import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';


const EditorText = ({ defaultContent = '', onChange }) => {
	const editorRef = useRef(null); // Referência para o elemento onde o editor será montado
	const quillInstance = useRef(null); // Referência para a instância do Quill

	useEffect(() => {
		// Inicializa o editor Quill apenas uma vez
		if (!quillInstance.current) {
			quillInstance.current = new Quill(editorRef.current, {
				theme: 'snow',
				modules: {
					toolbar: [
						[{ header: [1, 2, false] }],
						['bold', 'italic', 'underline'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link', 'image'],
						[{ align: [] }], // Adiciona alinhamento
					],
				},
			});

			// Define o conteúdo inicial, se fornecido
			quillInstance.current.root.innerHTML = defaultContent;

			// Configura o evento para capturar mudanças no texto
			quillInstance.current.on('text-change', () => {
				const content = quillInstance.current.root.innerHTML; // Pega o HTML atual do editor
				onChange(content); // Chama a função onChange passada como prop
			});
		} else {
			// Atualiza o conteúdo quando defaultContent muda
			quillInstance.current.root.innerHTML = defaultContent;
		}
	}, [defaultContent, onChange]);

	return (
		<div
			ref={editorRef} // Define a referência para o elemento div onde o editor será montado
			style={{ height: '400px', backgroundColor: 'white' }}
		/>
	);
};

export default EditorText;
