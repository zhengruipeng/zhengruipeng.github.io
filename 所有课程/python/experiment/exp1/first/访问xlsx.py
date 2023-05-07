from docx import Document

document = Document("MyDOCXFile.docx")
all_paragraphs = document.paragraphs
for paragraph in all_paragraphs:
    for run in paragraph.runs:
        print(run.text)
