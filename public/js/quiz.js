//frontend logic for quiz page
//event listeners when form is submitted, fetch post request to /api/quiz etc.
//once submitted, go back to profile
async function submitQuizAnswers(answers){
    try{
        const response = await fetch('/api/quiz', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        const data = await response.json();
        console.log(data);

    } catch (error){
        console.error('Error submitting answers', error);
    }
}

const quizAnswers = ['answer1', 'answer2'];
submitQuizAnswers(quizAnswers);