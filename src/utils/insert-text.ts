export function insertTextAtPosition(
    multiLineString: string,
    line: number,
    column: number,
    textToInsert: string
): string {
    const lines = multiLineString.split('\n');

    // Line numbering starts from 1.
    if (line < 1 || line > lines.length) {
        throw new Error('Invalid line number');
    }

    if (column < 0 || column > lines[line - 1].length) {
        throw new Error('Invalid column number');
    }

    const targetLine = lines[line - 1];
    const newLine = targetLine.slice(0, column) + textToInsert + targetLine.slice(column);

    lines[line - 1] = newLine;

    // Собрать строки обратно в одну многострочную строку
    return lines.join('\n');
}
