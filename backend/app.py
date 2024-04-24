from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import re

app = Flask(__name__)
CORS(app)

model = GPT2LMHeadModel.from_pretrained("/Users/Ishini Fernando/Downloads/ishini/ishini/backend/final-tuned-model")
tokenizer = GPT2Tokenizer.from_pretrained("/Users/Ishini Fernando/Downloads/ishini/ishini/backend/final-tuned-model")

def generate_next_hour(patient_info):
    input_ids = tokenizer.encode(patient_info, return_tensors="pt").to(model.device)

    output = model.generate(input_ids, max_length=200, num_return_sequences=1, temperature=0.7)

    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    next_hour_info = generated_text.split(" at hour ")[-1]
    
    cleaned_string = re.sub(r'[^\w\s\d]', '', next_hour_info)
    print(cleaned_string)
    

    index = cleaned_string.find("Patient of")
    if index != -1:
        result = cleaned_string[:index].strip()
        print("r1",result)
    else:
        print("The string 'Patient of' was not found.")
    
    age_pattern = r"age (\d+) has"
    end_pattern = r"\d+ mEqL Sodium Level"
    match = re.search(age_pattern, cleaned_string)

    if match:
        age_value = match.group(1)
    
        start_pos = cleaned_string.find(f"age {age_value} has") + len(f"age {age_value} has")
        end_pos = re.search(end_pattern, cleaned_string).start()

        result2 = cleaned_string[start_pos:end_pos].strip()
        print("r2",result2)
    else:
        print("Age value not found.")

    return result,result2

@app.route('/paragraph', methods=['POST'])
def receive_paragraph():
    data = request.get_json()

    paragraph = data.get('paragraph')
    
    result, result2 = generate_next_hour(paragraph)
    
    return jsonify({"message": "Paragraph received successfully", "result":result, "result2": result2})

if __name__ == '__main__':
    app.run(debug=True)
