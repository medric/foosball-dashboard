/**
 * MobX store
 * Handle state management and reactivty
 */
import { extendObservable, computed } from 'mobx';
import autoSave from './autoSave';
import { commonElements } from '../utils';

class FoosballStore {
    constructor() {
        this.load();

        autoSave(this, this.save.bind(this));
    }

    load() {
        let data = {
            participants: [],
            matches: [],
            participantsSelectOptions() {
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
                if (!this.participants.some((element, index) => element.name === participant.name)) {
                    this.participants.push(participant);
                } else {
                    throw {
                        message: "A participant with this name already exists",
                    }
                }
            },
            addMatch(match) {
                const { team0, team1 } = match;
                
                // Checks if any participant is in both team
                if (commonElements(team0, team1).length === 0) {
                    this.matches.push(match);
                } else {
                    throw {
                        message: "Participants can't be in both team",
                    }
                }
            },
            getParticipant(id) {
                return this.participants.filter((participant) => participant._id === id).shift();
            },
            getWinsLosses(id) {
                let wins = 0, losses = 0;
                this.matches
                    .filter((match) => 
                        match.team0.indexOf(id) !== -1 || match.team1.indexOf(id) !== -1) // Get every match a participant has played
                    .map((match) => {
                        const { winner } = match;
                        // The participant is in the winning team
                        if (match[winner.value].indexOf(id) !== -1) {
                            wins++;
                        } else {
                            losses++;
                        }
                    });
                
                return {
                    wins,
                    losses,
                    ratio: losses === 0 ? wins : (wins / losses),
                }
            },
            matchesByDate() {
                return this.matches.sort((a, b) => a.date - b.date);
            }
        };

        data = this.getFromStorage(data);
        extendObservable(this, data);
    }

    save(json) {
        localStorage.setItem('mobx_store', json);
    }

    getFromStorage(defaultObs) {
        const fromStorage = localStorage.getItem('mobx_store');
    
        // Retrieve data from localStorage
        if (fromStorage) {
           return {...defaultObs, ...JSON.parse(fromStorage)};
        } else {
            return defaultObs;
        }
    }
}

export default FoosballStore;
