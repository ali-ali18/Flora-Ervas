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
						[{ header: [1, 2, false] }],
						['bold', 'italic', 'underline'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link', 'image'],
						[{ align: [] }],
					],
				},
			});

			quillInstance.current.root.innerHTML = defaultContent;

			quillInstance.current.on('text-change', () => {
				const content = quillInstance.current.root.innerHTML;
				onChange(content);
			});
		}
	}, [onChange]);

	useEffect(() => {
		if (
			quillInstance.current &&
			quillInstance.current.root.innerHTML !== defaultContent
		) {
			quillInstance.current.root.innerHTML = defaultContent;
		}
	}, [defaultContent]);

	useEffect(() => {
		if (quillInstance.current) {
			quillInstance.current.clipboard.addMatcher(
				Node.ELEMENT_NODE,
				(node, delta) => {
					return delta; // Impede sobrescrita ao colar
				},
			);
		}
	}, []);

	return (
		<div
			ref={editorRef}
			style={{ height: '400px', backgroundColor: 'white' }}
		/>
	);
};
export default EditorText;
