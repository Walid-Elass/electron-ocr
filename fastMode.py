
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'python_libs'))
import fitz
import pandas as pd
import string
import re
import json

print(json.dumps({"type": "alert", "value": "Starting Search ..."}))

def calculate_page_total(folder_path):
    total_pages = 0
    for file_name in os.listdir(folder_path):
        if file_name.lower().endswith('.pdf'):
            file_path = os.path.join(folder_path, file_name)
            with fitz.open(file_path) as doc:
                total_pages += len(doc)
    return total_pages


def fastMode(dir,keywords,words_before,words_after):
    id=0
    total_pages = calculate_page_total(dir)
    remaining_pages = total_pages

    # Get all filenames in folder
    file_names = [f for f in os.listdir(dir) if (os.path.isfile(os.path.join(dir, f)) and f.lower().endswith('.pdf'))]
    # Define keyword
    # TODO: use a list of keywords instead
    search_words = keywords
    # Define the number of words to extract before and after the keyword

    # Initialize database
    results_df = pd.DataFrame(columns=['id','text_before', 'text_after', 'document', 'page'])

    # Open the PDF file in read binary mode
    for i in file_names:
        pdf_file = open(dir+'/'+i, 'rb')

        # Create a PDF reader object
        pdf_reader = fitz.open(pdf_file)


        # Get the number of pages in the PDF file
        num_pages = len(pdf_reader)
        
        # Loop through all the pages and extract the text data
        for page_num in range(num_pages):
            page_obj = pdf_reader[page_num]
            text_data = page_obj.get_text("text")
            # Perform some text cleaning before the search
            # 1- Remove punctuation
            punctuation = string.punctuation
            text_data=text_data.translate(str.maketrans('', '', punctuation))
            
            # Search for keyword and replace with token
            insensitive_search = re.compile('|'.join(map(re.escape, search_words)), re.IGNORECASE)
            text_data=insensitive_search.sub('kwrd', text_data)
            
            # Split text into words
            words = text_data.split()
            # Find the index of the token in the list of words
            # Find the indices of the keyword in the list of words
            indices = [i for i, x in enumerate(words) if x == "kwrd"]
            """ if "kwrd" in words:
                index = words.index("kwrd")
            else:
                index = -1 """

            if indices:
                # Loop through each instance of the keyword
                count=0
                for index in indices:
                    count+=1
                    # Extract the 10 words before the keyword
                    before_words = words[max(0, index-words_before):index]
                    # Extract the 10 words after the keyword
                    after_words = words[index+1:index+1+words_after]
                    # Create a new row to add to the dataframe
                    row = {'id':id,
                        'text_before': ' '.join(before_words),
                        'text_after': ' '.join(after_words),
                        'document': i,
                        'page': page_num+1}  # Replace this with the actual page number
                    
                    # Concatenate the new row to the dataframe
                    results_df = pd.concat([results_df, pd.DataFrame([row])], ignore_index=True)
                    id+=1
            else:
                """ print(f"The word '{search_words}' was not found in {i} - page {page_num}") """

        remaining_pages -= num_pages
        progress = min(int(100-(remaining_pages/total_pages)*100),99)
        print(json.dumps({"type": "progress", "value": progress}))
        # Close the PDF file
        pdf_file.close()
    
    # Save the search results dataframe as a CSV file
    results_df.to_csv('./src/results.csv',index='false')
    results_df.to_json('./src/results.json',orient='records')
    progress= 100
    print(json.dumps({"type": "progress", "value": progress}))
    print(json.dumps({"type": "results", "value": results_df.to_json(orient ='records')}))
    return results_df

fastMode(sys.argv[1],sys.argv[2].split(','),int(sys.argv[3]), int(sys.argv[4]))