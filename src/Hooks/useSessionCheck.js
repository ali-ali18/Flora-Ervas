import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fireBaseConfig';

const SESSION_LIMIT_HOURS = 24;
export const useSessionCheck = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const sessionStart = localStorage.getItem('sessionStart');

		if (!sessionStart) {
			localStorage.setItem('sessionStart', new Date().toISOString());
		} else {
            const sessionStartDate = new Date(sessionStart)
            const currentDate = new Date()
            const hoursPassed = (currentDate - sessionStartDate) / (1000 * 60 * 60)

            if (hoursPassed >= SESSION_LIMIT_HOURS) {
                auth.signOut().then(()=>{
                    localStorage.removeItem('sessionStart')
                    navigate('/login')
                })
            }
        }

	}, [navigate]);
};
