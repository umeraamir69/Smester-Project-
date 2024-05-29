import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import Game from '../../../models/Game';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res){
    verifyDbConnection(req, res);
    verifyRequestOrigin(req, res);
    try{
        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res: false, message: "Forbidden, Login First"});
     
        
        if(req.method === "GET"){
            if(req.body.id){
                const game = await Game.findById(req.body.id).populate('teamOne teamTwo channel league');
                if(game){
                    return res.status(200).json({status: true, message: "Game Found.", data: game});
                } else {
                    return res.status(404).json({status: false, error: "Game not found"});
                }
            } else {
                const games = await Game.find().populate('teamOne teamTwo channel league');
                return res.status(200).json({status: true, message: "All Games.", data: games});
            }
        }
        else if(req.method === "POST"){
            if(!(session.user.email == 'admin'  && session.user.name =="_admin") )return res.status(404).json({res: false, message: "User not allowed."});
            const { teamOne, teamTwo, channel, league, additionalLinks, matchDate, venue, scoreTeamOne, scoreTeamTwo, channelLabel, highlightsURL, primaryHeaderLink, otherHeaderLink, isLive } = req.body;

            let data = new Game({
                teamOne,
                teamTwo,
                channel,
                league,
                additionalLinks,
                matchDate,
                venue,
                scoreTeamOne,
                scoreTeamTwo,
                channelLabel,
                highlightsURL,
                primaryHeaderLink,
                otherHeaderLink,
                isLive
            });

            const result = await data.save();
            return res.status(201).json({status: true, message: "Game Added Successfully", data: result});
        } 
        else if(req.method === "PUT"){
            if(!(session.user.email == 'admin'  && session.user.name =="_admin") ) return res.status(404).json({res: false, message: "User not allowed."});
            const { _id, teamOne, teamTwo, channel, league, additionalLinks, matchDate, venue, scoreTeamOne, scoreTeamTwo, channelLabel, highlightsURL, primaryHeaderLink, otherHeaderLink, isLive } = req.body;

            let updatedFields = {};
            if(teamOne) updatedFields.teamOne = teamOne;
            if(teamTwo) updatedFields.teamTwo = teamTwo;
            if(channel) updatedFields.channel = channel;
            if(league) updatedFields.league = league;
            if(additionalLinks) updatedFields.additionalLinks = additionalLinks;
            if(matchDate) updatedFields.matchDate = matchDate;
            if(venue) updatedFields.venue = venue;
            if(scoreTeamOne !== undefined) updatedFields.scoreTeamOne = scoreTeamOne;
            if(scoreTeamTwo !== undefined) updatedFields.scoreTeamTwo = scoreTeamTwo;
            if(channelLabel) updatedFields.channelLabel = channelLabel;
            if(highlightsURL) updatedFields.highlightsURL = highlightsURL;
            if(primaryHeaderLink) updatedFields.primaryHeaderLink = primaryHeaderLink;
            if(otherHeaderLink) updatedFields.otherHeaderLink = otherHeaderLink;
            if(isLive !== undefined) updatedFields.isLive = isLive;

            try {
                const result = await Game.findByIdAndUpdate(_id, updatedFields, { new: true });
                if(result){
                    return res.status(200).json({status: true, message: "Game Updated.", data: result});
                } else {
                    return res.status(404).json({status: false, error: "Game not found."});
                }
            } catch (error) {
                console.error("An error occurred while updating game:", error);
                return res.status(500).json({status: false, error: "An error occurred."});
            }
        } else if(req.method === "DELETE"){
            if(!(session.user.email == 'admin'  && session.user.name =="_admin") ) return res.status(404).json({res: false, message: "User not allowed."});
            const { id } = req.body;

            try {
                const deletedGame = await Game.findByIdAndDelete(id);
                if(deletedGame){
                    return res.status(200).json({status: true, message: "Game deleted successfully."});
                } else {
                    return res.status(404).json({status: false, message: "Game not found."});
                }
            } catch (error) {
                console.error("An error occurred while deleting game:", error);
                return res.status(500).json({status: false, message: "An error occurred."});
            }
        }
        else {
            return res.status(405).json({status: false, error: "Method Not Allowed."});
        }
    }
    catch (error){
        console.log(error);
        return res.status(404).json({status: false, error: error});
    }
}
