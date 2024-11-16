const checkAuth = async (navigate, supabase) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        navigate('/login');
    }
};

export default checkAuth