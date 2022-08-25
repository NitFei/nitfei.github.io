class Sequencer {
    constructor(_audioCtx, _audioSystem) {
        this.audioCtx = _audioCtx;
        this.as = _audioSystem;

        this.bpm = 30.0;
        this.lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
        this.currentNote = 0;
        this.nextNoteTime = 0; // when the next note is due.
        this.notesInQueue = []; 
        this.sequenceTimer;   
        
        this.isPlaying = false;
    }

    nextNote() {
        const secondsPerBeat = 60.0 / this.bpm;
    
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time
    
        // Advance the beat number, wrap to zero
        this.currentNote++;
        if (this.currentNote === 4) {
                this.currentNote = 0;
        }
    }

    scheduleNote(beatNumber, time) {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time });
        this.as.samples.forEach( (s) => {
            if(s.isInSequence && s.barsToPlay.includes(this.currentNote)) {
                this.as.playSampleWithDelay(s, time);
            }
        });
    }

    scheduler() {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime ) {
            this.scheduleNote(this.currentNote, this.nextNoteTime);
            this.nextNote();
        }

        this.sequenceTimer = setTimeout( () => {
            this.scheduler();
        }, this.lookahead);
    }

    stopSequencer() {
        clearTimeout(this.sequenceTimer);
        this.isPlaying = false;
    }

    startSequencer() {
        clearTimeout(this.sequenceTimer);
        this.isPlaying = true;
        this.scheduler();
    }
}