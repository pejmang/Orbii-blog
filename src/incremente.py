import os
import re

# Define the directory containing the markdown files
posts_directory = '/Users/admin/Desktop/Orbii-blog/src/posts/'
output_file_fr = os.path.join(posts_directory, 'published-FR.txt')
output_file_en = os.path.join(posts_directory, 'published-EN.txt')

# Regular expressions to capture the relevant fields
article_id_re = re.compile(r'articleID:\s*"?(.*?)"?\s*$')
title_re = re.compile(r'title:\s*"?(.+?)"?\s*$')
authors_re = re.compile(r'authors:\s*"?(.+?)"?\s*$')
date_re = re.compile(r'date:\s*(.*?)\s*$')
language_re = re.compile(r'language:\s*(.*?)\s*$')

# Function to extract the required fields from markdown files
def extract_article_data(directory):
    articles_data_fr = []
    articles_data_en = []
    
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            article_id = title = authors = date = language = None
            
            with open(file_path, "r") as file:
                for line in file:
                    if not article_id and article_id_re.search(line):
                        article_id = article_id_re.search(line).group(1).strip()
                    if not title and title_re.search(line):
                        title = title_re.search(line).group(1).strip()
                    if not authors and authors_re.search(line):
                        authors = authors_re.search(line).group(1).strip()
                    if not date and date_re.search(line):
                        date = date_re.search(line).group(1).strip()
                    if not language and language_re.search(line):
                        language = language_re.search(line).group(1).strip()
                    
                    # Continue reading until all data is found
                    if article_id and title and authors and date and language:
                        break
            
            # If all fields were found, add them to the appropriate list based on the language
            if article_id and title and authors and date and language:
                if language == 'fr':
                    articles_data_fr.append((article_id, date, authors, title))
                elif language == 'en':
                    articles_data_en.append((article_id, date, authors, title))

    # Sort the data by articleID in ascending order
    articles_data_fr.sort(key=lambda x: x[0])
    articles_data_en.sort(key=lambda x: x[0])
    
    return articles_data_fr, articles_data_en

# Write the extracted data to the output files
def write_published_file(output_file, articles_data):
    with open(output_file, "w") as f:
        for article in articles_data:
            f.write(f"{article[0]} {article[1]} {article[2]} {article[3]}\n")

# Run the extraction and writing process
articles_data_fr, articles_data_en = extract_article_data(posts_directory)

if articles_data_fr:
    write_published_file(output_file_fr, articles_data_fr)
    print(f"French articles data has been written to {output_file_fr}")
else:
    print("No French articles data found.")

if articles_data_en:
    write_published_file(output_file_en, articles_data_en)
    print(f"English articles data has been written to {output_file_en}")
else:
    print("No English articles data found.")
