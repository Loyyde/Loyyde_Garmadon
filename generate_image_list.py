import os

slide_folder = 'Slide'
image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
image_files = []

if os.path.exists(slide_folder) and os.path.isdir(slide_folder):
    for filename in os.listdir(slide_folder):
        if any(filename.lower().endswith(ext) for ext in image_extensions):
            image_files.append(filename)

javascript_array = "const imageFilenames = [\n"
if image_files:
    javascript_array += "    '" + "',\n    '".join(image_files) + "'\n];"
else:
    javascript_array += "];"

output_filename = 'image_list.js'
with open(output_filename, 'w') as f:
    f.write(javascript_array)

print(f"Generated '{output_filename}' with the list of image files.")
