const capi = require('node-canvas-api')
const writeWeeklyDiscussionsToCSV = require('./writeWeeklyDiscussionsToCSV')

const getDiscussionTopicIds = courseId => capi.getDiscussionTopics(courseId)
  .then(discussions => discussions.map(x => x.id))

const getReplyDetails = (replyObj, participants, topicId) => {
  const authorName = participants.find(x => x.id === replyObj.user_id)
    ? participants.find(x => x.id === replyObj.user_id).display_name
    : ''

  return [{
    authorId: replyObj.user_id,
    authorName: authorName,
    message: replyObj.message,
    likes: replyObj.rating_sum,
    timestamp: replyObj.created_at,
    parentId: replyObj.parent_id || topicId,
    id: replyObj.id
  }]
}

const getDiscussions = async courseId => {
  const discussionTopicIds = await getDiscussionTopicIds(courseId)
  const discussionAndTopic = await Promise.all(
    discussionTopicIds
      .map(topicId => Promise.all([
        capi.getFullDiscussion(courseId, topicId),
        capi.getDiscussionTopic(courseId, topicId)
      ]))
  )
  return discussionAndTopic.map(([discussion, topic]) => {
    const topicTitle = topic.title
    const topicMessage = topic.message
    const author = topic.author
    const timestamp = topic.created_at
    const topicId = topic.id
    const participants = discussion.participants
    const replies = discussion.view.length > 0
      ? discussion.view
        .filter(x => !x.deleted)
        .map(reply => getReplyDetails(reply, participants, topicId))
      : []
    return {
      topicTitle,
      topicMessage,
      id: topicId,
      authorId: author.id || '',
      authorName: author.display_name || '',
      timestamp,
      replies
    }
  })
}


Promise.all([
  courseId = 225174
].map(courseId => getDiscussions(courseId)
  .then(discussions => writeWeeklyDiscussionsToCSV(courseId, discussions))
))
