const { Readable } = require('stream');

const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
];

class StreamFromArray extends Readable {
    constructor(array) {
        // super(); // Binary mode
        // super({ encoding: 'utf-8' }); // String mode
        super({ objectMode: true }); // Object mode
        this.array = array;
        this.index = 0;
    }

    _read() {
        if (this.index <= this.array.length) {
            const chunk = this.array[this.index];
            // this.push(chunk); // pushing string
            this.push({
                data: chunk,
                index: this.index
            }); // Pushing object when ObjectMode is true
            this.index += 1;
        } else {
            this.push(null);
        }
    }
}

const numberStream = new StreamFromArray(numbers);

numberStream.on('data', (chunk) => console.log(chunk));

numberStream.on('end', () => console.log('done!'));