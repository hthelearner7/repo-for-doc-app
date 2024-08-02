import React from 'react'
import Layout from './../components/Layout';

// import "../styles/articles.css"
import { Tabs } from 'antd';

const Articles = () => {



    const categories = [
        {
            title: "Underweight (BMI < 18.5)",
            description: "Underweight individuals need nutrient-dense foods to gain weight healthily.",
            foods: ["Paneer", "Ghee", "Nuts", "Seeds", "Avocados", "Brown rice", "Quinoa", "Paneer butter masala", "Dal makhani", "Khichdi"]
        },
        {
            title: "Normal Weight (BMI 18.5 - 24.9)",
            description: "For those with a normal BMI, maintaining a balanced diet is crucial.",
            foods: ["Fruits", "Vegetables", "Whole grains", "Lean proteins", "Dal", "Roti", "Sabzi", "Yogurt"]
        },
        {
            title: "Overweight (BMI 25 - 29.9)",
            description: "Overweight individuals should focus on reducing calorie intake while ensuring nutritional balance.",
            foods: ["Oats", "Whole grains", "Legumes", "Vegetables", "Fruits", "Vegetable pulao", "Mixed lentil soup", "Salads"]
        },
        {
            title: "Obese (BMI ≥ 30)",
            description: "For those who are obese, a structured dietary plan is essential.",
            foods: ["Vegetable soups", "Steamed vegetables", "Salads", "Low-calorie foods", "High-fiber foods"]
        },
    ];

    // 1st component
    const BMICategory = ({ title, description, foods }) => (
        <div className="card m-2 p-2" style={{ backgroundColor: "#fff8a5" }}>
            <h2 className='card-title ' style={{ color: "#333" }}>{title}</h2>
            <hr />
            <p className='card-text'>{description}</p>
            <h3 className='card-subtitle'>Recommended Foods:</h3>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>{food}</li>
                ))}
            </ul>
        </div>
    );

    // 2nd component

    const ExerciseArticle = () => (
        <div className="card p-4 m-2 " style={{ backgroundColor: "#fff8a5" }}>
            <h2>Importance of Exercise and How It Helps in Reducing Health Risks</h2>
            <p>
                Regular exercise is essential for maintaining a healthy lifestyle and reducing the risk of chronic diseases. Engaging in physical activities such as walking, jogging, yoga, and cycling helps improve cardiovascular health, strengthen muscles, and enhance flexibility. Exercise also boosts the immune system, making the body more resistant to infections.
            </p>
            <p>
                For Indian vegetarians, incorporating physical activity into daily routines can be paired with a balanced diet rich in fruits, vegetables, legumes, and whole grains. Activities like yoga not only provide physical benefits but also promote mental well-being by reducing stress and anxiety. Consistent exercise can help manage weight, lower blood pressure, and reduce the risk of diseases like diabetes and heart disease.
            </p>
            <p>
                It is important to start slowly and gradually increase the intensity of workouts. Even moderate exercise, such as brisk walking for 30 minutes a day, can have significant health benefits. Combining exercise with a nutritious diet that includes items like paneer, lentils, and fresh vegetables can optimize health and reduce the risk of chronic diseases.
            </p>
        </div>
    );

    // 3rd component
    const MuscleBuildingArticle = () => (
        <div style={{ backgroundColor: "#fff8a5" }} className='card p-4 m-2 '>
            <h2>Muscle Building and Diet</h2>
            <p>
                Building muscle requires a combination of resistance training and a protein-rich diet. Engaging in weightlifting, bodyweight exercises, or resistance band workouts helps stimulate muscle growth. For Indian vegetarians, consuming adequate protein is crucial for muscle repair and growth.
            </p>
            <p>
                Include foods such as paneer, lentils, chickpeas, tofu, and quinoa in your diet. These provide essential amino acids necessary for muscle synthesis. Additionally, incorporating nuts and seeds like almonds, walnuts, and flaxseeds can enhance your protein intake. Ensure that your meals are balanced with carbohydrates and healthy fats to support energy levels during workouts.
            </p>
            <p>
                Post-workout nutrition is vital. Consuming a meal or snack rich in protein and carbohydrates within 30 minutes of exercising can aid in muscle recovery. For example, a smoothie with Greek yogurt, banana, and spinach can be an excellent post-workout option. Staying hydrated and getting enough sleep are also important factors in muscle building. Consistent training, proper nutrition, and recovery are the keys to building muscle effectively.
            </p>
        </div>
    );

    // 4th component
    const FatLossArticle = () => (
        <div style={{ backgroundColor: "#fff8a5" }} className='card p-4 m-2 '>
            <h2>Fat Loss and Diet</h2>
            <p>
                Achieving fat loss involves creating a calorie deficit through a combination of diet and exercise. For Indian vegetarians, focusing on nutrient-dense, low-calorie foods is essential. Incorporating plenty of vegetables, fruits, whole grains, and legumes can help reduce calorie intake while providing necessary nutrients.
            </p>
            <p>
                Meals should be high in fiber and protein to keep you feeling full longer. Foods like lentils, chickpeas, leafy greens, and whole grains such as brown rice and quinoa are excellent choices. Avoid processed foods and sugary snacks, and opt for healthy fats from sources like avocados, nuts, and seeds.
            </p>
            <p>
                Regular physical activity, including both cardio and strength training, is crucial for fat loss. Activities such as brisk walking, running, cycling, and strength exercises help burn calories and build lean muscle, which can increase metabolism. Staying hydrated and practicing mindful eating can also support fat loss goals. By combining a balanced diet with regular exercise, you can achieve sustainable fat loss and improve overall health.
            </p>
        </div>
    );

    // 5th component
    const NearsightednessArticle = () => (
        <div style={{ backgroundColor: "#fff8a5" }} className='p-2 m-2 card'>
            <h2>Modern Day Nearsightedness Issue in Teenagers and How to Protect Your Eyes</h2>
            <p>
                Nearsightedness, or myopia, is increasingly common among teenagers, often due to prolonged screen time and insufficient outdoor activities. This condition can lead to blurred distance vision and may worsen over time if not addressed.
            </p>
            <p>
                To protect your eyes, it is important to follow the 20-20-20 rule: every 20 minutes, take a 20-second break and look at something 20 feet away. Encouraging outdoor activities can also help reduce the progression of myopia. Sunlight exposure has been shown to be beneficial for eye health.
            </p>
            <p>
                A diet rich in eye-friendly nutrients is essential. Indian vegetarians can include foods like carrots, spinach, sweet potatoes, and bell peppers, which are high in beta-carotene and vitamins A, C, and E. Omega-3 fatty acids, found in flaxseeds and walnuts, also support eye health. Regular eye check-ups and using proper lighting while reading or using screens can further protect your eyes. By taking these steps, teenagers can maintain good vision and reduce the risk of developing severe myopia.
            </p>
        </div>
    );


    const items = [
        {
            key: '1',
            label: 'A',
            children: <div key={'random-ARTCILE-1'} className="m-1 p-1">
                <h5 className='card-title'>Understanding BMI and Healthy Eating Habits</h5>
                {categories.map((category, index) => (
                    <BMICategory key={index} {...category} />
                ))}
            </div>,
        },
        {
            key: '2',
            label: 'B',
            children: <div key={'random2'}><ExerciseArticle /></div>

        },
        {
            key: '3',
            label: 'C',
            children: <div key={'random2'}><NearsightednessArticle /></div>
        },
        {
            key: '4',
            label: 'D',
            children: <div key={'random2'}><MuscleBuildingArticle /></div>
        },
        {
            key: '5',
            label: 'E',
            children: <div key={'random2'}><FatLossArticle /></div>
        }
    ];





    return (
        <Layout>
            <h1 className='text-center mt-2'><span><i className='fa-solid fa-newspaper'></i></span> Articles</h1>
            <h4 className='text-secondary text-center'>Switch Tabs by clicking on the number</h4>
            <div className='d-flex justify-content-center align-items-center w-auto' >
                <Tabs defaultActiveKey="1" items={items} />
            </div>

        </Layout>
    )
}

export default Articles