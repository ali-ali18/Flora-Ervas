import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../fireBaseConfig';
import { imageUrls } from '../assets/Object';

export const useLogin = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const setRandomBackgroundImage = () => {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        setBackgroundImage(imageUrls[randomIndex]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn('Por favor, preencha ambos os campos de e-mail e senha');
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login realizado com sucesso');
            navigate('/contato');
        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/wrong-password') {
                toast.warn('Senha incorreta');
            } else if (error.code === 'auth/user-not-found') {
                toast.warn('Usuário não encontrado');
            } else if (error.code === 'auth/invalid-credential') {
                toast.warn('A senha ou email não são válidos');
            } else {
                toast.error(
                    'Um erro ocorreu, tente novamente ou entre em contato com o suporte',
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRandomBackgroundImage();
    }, []);

    return {
        isVisible,
        toggleVisibility,
        backgroundImage,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleSubmit,
    };
};
