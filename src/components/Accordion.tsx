import styles from './Accordion.module.css';
import { useEffect, useState } from 'react';

export default function Accordion() {
    const [active, setActive] = useState<number | null>(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const questionsAnswers = [
        {
            question: 'How many team members can I invite?',
            answer: 'You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.'
        },
        {
            question: 'What is the maximum file upload size?',
            answer: 'No more than 2GB. All files in your account must fit your allotted storage space.'
        },
        {
            question: 'How do I reset my password?',
            answer: 'Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.'
        },
        {
            question: 'Can I cancel my subscription?',
            answer: 'Yes! Send us a message and we\'ll process your request no questions asked.'
        },
        {
            question: 'Do you provide additional support?',
            answer: 'Chat and email support is available 24/7. Phone lines are open during normal business hours.'
        }
    ];

    const handleClick = (index: number) => {
        if (index === active) {
            setActive(null);
        } else {
            setActive(index);
        }

    };

    return (
        <div className={styles["container"]}>
            <div className={styles["images"]}>
                {screenWidth < 1100 ?
                    <>
                        <img className={styles["woman-computer-mobile"]} src="/illustration-woman-online-mobile.svg" alt="woman-computer" />
                    </>
                    :
                    <>
                        <img className={styles["woman-computer"]} src="/illustration-woman-online-desktop.svg" alt="woman-computer" />
                        <img className={styles["illustration-box"]} src="/illustration-box-desktop.svg" alt="illustration-box" />
                    </>
                }
            </div>

            <div className={styles["accordion"]}>
                <h1>FAQ</h1>

                {questionsAnswers.map(({ question, answer }, index) => {
                    return <div key={index} className={styles["question-answer"]}>
                        {active === index ?
                            <>
                                <button className={styles["active"]} onClick={() => handleClick(index)}>{question}</button>
                                <img className={`${styles["arrow"]} ${styles["active"]}`} src="/icon-arrow-down.svg" alt="arrow" />
                                <p className={styles["active"]}>{answer}</p>
                            </>
                            :
                            <>
                                <button onClick={() => handleClick(index)}>{question}</button>
                                <img className={styles["arrow"]} src="/icon-arrow-down.svg" alt="arrow" />
                                <p>{answer}</p>
                            </>
                        }
                    </div>;
                })}
            </div>
        </div>
    );
}