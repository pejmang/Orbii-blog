import os

# Define the directory containing the markdown files
posts_directory = '/Users/admin/Desktop/Orbii-blog/src/posts/'

# Function to add the licence tag if it doesn't exist
def add_licence_to_md_files(directory, licence="MIT"):
    # Loop through each file in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            
            with open(file_path, "r") as file:
                content = file.readlines()

            # Check if the file has front matter (header)
            if content[0].strip() == "---":
                # Find where the front matter ends
                header_end_index = None
                has_licence_tag = False
                for index, line in enumerate(content[1:], start=1):
                    if line.strip().startswith("licence:"):
                        has_licence_tag = True
                        break
                    if line.strip() == "---":
                        header_end_index = index
                        break

                # If no licence tag is found, add it before the header ends
                if not has_licence_tag and header_end_index:
                    content.insert(header_end_index, f"licence: {licence}\n")
                    # Save the updated content back to the file
                    with open(file_path, "w") as file:
                        file.writelines(content)
            else:
                # If there's no front matter, add it
                new_content = ["---\n", f"licence: {licence}\n", "---\n"] + content
                # Save the updated content back to the file
                with open(file_path, "w") as file:
                    file.writelines(new_content)

# Running the function on the provided directory
add_licence_to_md_files(posts_directory)
