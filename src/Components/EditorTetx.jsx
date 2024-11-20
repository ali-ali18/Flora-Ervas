import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const EditorText = ({ defaultContent = '', onChange }) => {
	const editorRef = useRef(null);
	const quillInstance = useRef(null);

	useEffect(() => {
		if (!quillInstance.current) {
			quillInstance.current = new Quill(editorRef.current, {
				theme: 'snow',
				modules: {
					toolbar: [
						[{ header: [1, 2,3,4,5, false] }],
						['bold', 'italic', 'underline'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link', 'image'],
						[{ align: [] }],
					],
				},
			});

			// Adiciona conteúdo inicial ao Quill
			quillInstance.current.clipboard.dangerouslyPasteHTML(defaultContent);

			// Atualiza o estado com mudanças no texto
			quillInstance.current.on('text-change', () => {
				const content = quillInstance.current.root.innerHTML;
				onChange(content);
			});
		}
	}, [onChange]);

	useEffect(() => {
		if (quillInstance.current) {
			// Atualiza o conteúdo no editor se o defaultContent mudar
			if (quillInstance.current.root.innerHTML !== defaultContent) {
				quillInstance.current.clipboard.dangerouslyPasteHTML(defaultContent);
			}
		}
	}, [defaultContent]);

	// Retorna o HTML atual do editor
	const getEditorContent = () => {
		if (quillInstance.current) {
			return quillInstance.current.root.innerHTML; // Retorna o HTML
		}
		return '';
	};

	// Retorna o texto sem formatação
	const getPlainText = () => {
		if (quillInstance.current) {
			return quillInstance.current.getText(); // Retorna o texto puro
		}
		return '';
	};

	return (
		<div
			ref={editorRef}
			style={{ height: '400px', backgroundColor: 'white' }}
		/>
	);
};

export default EditorText;
