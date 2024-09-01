import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text:createCommentDto.text,
      parent:createCommentDto.parentId || null,
      user:createCommentDto.userId,
    });
    return createdComment.then((doc)=>{
      return doc.populate(['user','parent']);
    });
  }

  getTopLevelComments(){
    return this.commentModel
    .find({
      parent:null,
    })
    .populate(['user','parent'])
    .sort({createdAt:-1})
    .exec();
  }

  getCommentsByParentId(parentId:string){
    try {
      return this.commentModel
      .find({
        parent:parentId,
      })
      .populate(['user','parent'])
      .sort({createdAt:-1})
      .exec();
    } catch (error) {
      throw new BadRequestException('Something bad happened', { 
        cause: new Error(error.message), 
        description: 'Some error description' })
    }
  }

  findAll() {
    return this.commentModel.find().populate(['user','parent']).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
