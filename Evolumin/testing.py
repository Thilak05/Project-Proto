from groq import Groq
from firebase_admin import credentials, initialize_app, db

# Initialize Firebase app
cred = credentials.Certificate("evolumin-fb768-firebase-adminsdk-5rhpr-15c4de4281.json")
initialize_app(cred, {
    'databaseURL': 'https://evolumin-fb768-default-rtdb.firebaseio.com/'
})

# Initialize Groq client
client = Groq(api_key='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')

# Get user input for symptoms and mobile number
def get_user_input():
    symptoms = input("Enter your symptoms: ")
    mobile = input("Enter the patient's mobile number: ")
    return symptoms, mobile

# Fetch patient data from Firebase
def fetch_patient_data(mobile):
    user_ref = db.reference(f"/users/{mobile}")
    user_data = user_ref.get()
    
    if user_data:
        bpm = user_data.get("bpm", "Not Available")
        temperature = user_data.get("temperature", "Not Available")
        gender = user_data.get("gender", "Not Available")
        height = user_data.get("height", "Not Available")
        weight = user_data.get("weight", "Not Available")
    else:
        print("No data found for the provided mobile number.")
        bpm = temperature = gender = height = weight = None

    return bpm, temperature, gender, height, weight

# Generate prompt for the model
def generate_prompt(symptoms, bpm, temperature, gender, height, weight):
    prompt = f"""
    Patient presents with the following:
    - Symptoms: {symptoms}
    - Heart Rate (BPM): {bpm}
    - Temperature: {temperature}°F
    - Gender: {gender}
    - Height: {height}
    - Weight: {weight}
    
    Based on this information, predict the disease and suggest the most appropriate medication or treatment plan.
    """
    return prompt

# Query the Llama model for response
def query_llama(prompt):
    completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7, 
        max_tokens=512,    
        top_p=0.9,         
        stream=False,      
        stop=None      
    )
    
    return completion.choices[0].message.content

# Main function to execute program flow
def main():
    symptoms, mobile = get_user_input()
    bpm, temperature, gender, height, weight = fetch_patient_data(mobile)

    if bpm is None or temperature is None:
        print("Patient data not available. Exiting.")
        return
    
    prompt = generate_prompt(symptoms, bpm, temperature, gender, height, weight)
    response = query_llama(prompt)

    print("\nRecommended Treatment Plan:\n")
    print(response)

if __name__ == "__main__":
    main()
