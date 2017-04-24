/**
 * MobX store
 * 
 */
import { extendObservable, computed } from 'mobx';

class FoosballStore {
    constructor() {
        extendObservable(this, {
            matches: [],
            participants: [],
            get participantsSelectOptions() {
                const options = [];
                this.participants.map((participant, index) => {
                    options[index] = {
                        value: participant._id,
                        label: participant.name,
                    }
                });

                return options;
            },
            addParticipant(participant) {
                this.participants.push(participant);
            },
            addMatch(match) {
                this.matches.push(match);
            },
            getCompletedMatches() {
            }
        });
    }
}

export default FoosballStore;
