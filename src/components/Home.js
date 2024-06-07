const Home = () => {
    return (
        <>
            <div style={styles.title}>
                Welcome
            </div>
            <div style={styles.container}>
                Welcome to VR resourcing. Select a resource to view role eligibility and skills for selected resources.
            </div>
        </>
    );
}

const styles = {
    container: {
        marginBottom: '25px', 
        color: "#4d5562",
    },
    title: {
        marginBottom: '25px', 
    },
};

export default Home;
