import mongoose from 'mongoose';
import TibiaAPI from 'tibia-api';

const { WORLD_NAME } = process.env;

const tibiaAPI = new TibiaAPI({ worldName: WORLD_NAME });

const characterSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  characterName: {
    type: String,
  },
});

const Characters = mongoose.model('Characters', characterSchema, 'characters');

export const removeCharacter = async (character) => (
  new Promise(async (resolve, reject) => {
    try {
      await Characters.findOneAndDelete(character);

      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export const addCharactersByGuildName = async (guildName, type) => (
  new Promise(async (resolve, reject) => {
    try {
      const guildInformation = await tibiaAPI.getGuildInformation({
        guildUrl: `https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${guildName}&action=characters`
      });

      const { members, invitedMembers } = guildInformation;
  
      const characters = [...members, ...invitedMembers].map(({ name }) => ({ characterName: name, type }));
  
      await Promise.all(characters.map(insertCharacter));
  
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export const insertCharacter = async (character) => (
  new Promise(async (resolve, reject) => {
    try {
      const { characterName } = character;

      const query = await Characters.findOne({ characterName });

      if (query) {
        resolve();
        return;
      }
      const newCharacter = new Characters(character);

      await newCharacter.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export default Characters;
